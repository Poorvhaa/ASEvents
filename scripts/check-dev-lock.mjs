import { execSync } from 'child_process'

function isPortInUse(port) {
  try {
    const isWindows = process.platform === 'win32'
    const cmd = isWindows 
      ? `netstat -ano | findstr :${port}` 
      : `lsof -i :${port} -t`
    const stdout = execSync(cmd, { encoding: 'utf8' })
    return stdout.includes('LISTENING') || (!isWindows && stdout.trim().length > 0)
  } catch (e) {
    return false
  }
}

function isNextRunning() {
  // 1. Check if ports 3000 or 3001 are in use
  if (isPortInUse(3000) || isPortInUse(3001)) {
    return true
  }

  // 2. Check running processes
  try {
    const isWindows = process.platform === 'win32'
    if (isWindows) {
      const stdout = execSync("wmic process where \"name='node.exe'\" get commandline", { encoding: 'utf8' })
      const lines = stdout.split('\n')
      let nextDevCount = 0
      for (const line of lines) {
        if (line.includes('next') && line.includes('dev') && line.includes('ASEvents') && !line.includes('check-dev-lock')) {
          nextDevCount++
        }
      }
      if (nextDevCount > 0) {
        return true
      }
    } else {
      const cmd = "ps aux | grep node | grep -E 'next dev' | grep -E 'ASEvents' | grep -v grep | grep -v check-dev-lock"
      const stdout = execSync(cmd, { encoding: 'utf8' })
      if (stdout.trim().length > 0) {
        return true
      }
    }
  } catch (e) {
    // Fallback: check general Node count
    try {
      const isWindows = process.platform === 'win32'
      const stdout = execSync(isWindows ? 'tasklist' : 'ps aux', { encoding: 'utf8' })
      const nodeCount = (stdout.match(/node(\.exe)?/gi) || []).length
      if (nodeCount > 1) {
        return true
      }
    } catch (err) {
      // ignore
    }
  }

  return false
}

function checkDevLock() {
  console.log("Checking if another Next.js development server is already active...")

  if (isNextRunning()) {
    console.error("\n[ERROR] Another Next.js dev server is already running for ASEvents.")
    console.error("Please stop the other server before starting a new one.\n")
    process.exit(1)
  }

  console.log("No active Next.js development server detected. Safe to start.")
}

checkDevLock()
