import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const packageJsonPath = path.join(projectRoot, 'package.json')
const nextDevDir = path.join(projectRoot, '.next-dev')
const nextBuildDir = path.join(projectRoot, '.next-build')
const nodeModulesCacheDir = path.join(projectRoot, 'node_modules', '.cache')

function verifyEnvironment() {
  console.log("Verifying reset environment...")
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`[ERROR] package.json not found at expected path: ${packageJsonPath}`)
    process.exit(1)
  }

  const rootDirName = path.basename(projectRoot).toLowerCase()
  const allowedRoots = ['asevents', 'my-project']
  if (!allowedRoots.includes(rootDirName) && !projectRoot.toLowerCase().includes('asevents')) {
    console.error(`[ERROR] Reset script must run only inside the AS Events project folder. Current root: ${projectRoot}`)
    process.exit(1)
  }
}

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
  // Check ports
  if (isPortInUse(3000) || isPortInUse(3001)) {
    return true
  }

  // Also check running node processes
  try {
    const isWindows = process.platform === 'win32'
    if (isWindows) {
      const stdout = execSync("wmic process where \"name='node.exe'\" get commandline", { encoding: 'utf8' })
      const lines = stdout.split('\n')
      let activeNextProcs = 0
      for (const line of lines) {
        if (line.includes('next') && (line.includes('dev') || line.includes('build') || line.includes('start')) && line.includes('ASEvents') && !line.includes('reset-dev')) {
          activeNextProcs++
        }
      }
      if (activeNextProcs > 0) {
        return true
      }
    } else {
      const cmd = "ps aux | grep node | grep -E 'next (dev|build|start)' | grep -E 'ASEvents' | grep -v grep | grep -v reset-dev"
      const stdout = execSync(cmd, { encoding: 'utf8' })
      if (stdout.trim().length > 0) {
        return true
      }
    }
  } catch (e) {
    // Fallback: check general Node process count
    try {
      const isWindows = process.platform === 'win32'
      const cmd = isWindows ? 'tasklist' : 'ps aux'
      const stdout = execSync(cmd, { encoding: 'utf8' })
      const nodeCount = (stdout.match(/node(\.exe)?/gi) || []).length
      // This reset script itself is 1 node process
      if (nodeCount > 1) {
        return true
      }
    } catch (err) {
      // ignore
    }
  }

  return false
}

function resetDev() {
  verifyEnvironment()

  if (isNextRunning()) {
    console.error("\n[ERROR] Cannot reset development cache while Node/Next.js processes are active.")
    console.error("Please terminate all running development servers first.\n")
    process.exit(1)
  }

  console.log("Proceeding with development reset...")

  // Clean .next-dev
  if (fs.existsSync(nextDevDir)) {
    try {
      fs.rmSync(nextDevDir, { recursive: true, force: true })
      console.log("✓ Cleared Next.js dev build cache (.next-dev)")
    } catch (err) {
      console.error(`[WARNING] Could not clear .next-dev cache: ${err.message}`)
    }
  } else {
    console.log(".next-dev cache does not exist. Skipping.")
  }

  // Clean .next-build
  if (fs.existsSync(nextBuildDir)) {
    try {
      fs.rmSync(nextBuildDir, { recursive: true, force: true })
      console.log("✓ Cleared Next.js production build cache (.next-build)")
    } catch (err) {
      console.error(`[WARNING] Could not clear .next-build cache: ${err.message}`)
    }
  } else {
    console.log(".next-build cache does not exist. Skipping.")
  }

  if (fs.existsSync(nodeModulesCacheDir)) {
    try {
      fs.rmSync(nodeModulesCacheDir, { recursive: true, force: true })
      console.log("✓ Cleared node_modules cache (node_modules/.cache)")
    } catch (err) {
      console.error(`[WARNING] Could not clear node_modules cache: ${err.message}`)
    }
  } else {
    console.log("node_modules/.cache does not exist. Skipping.")
  }

  console.log("\nReset completed successfully.")
  console.log("To start the development server, run:")
  console.log("  npm run dev\n")
}

resetDev()
