import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const nextDir = path.join(projectRoot, '.next')

function isNextRunning() {
  // 1. Attempt to rename .next to a temporary folder to check for Windows file locks
  if (fs.existsSync(nextDir)) {
    try {
      const tempPath = path.join(projectRoot, `.next_temp_clean_${Date.now()}`)
      fs.renameSync(nextDir, tempPath)
      // If rename succeeded, it is NOT locked. Clean the temp directory instead.
      fs.rmSync(tempPath, { recursive: true, force: true })
      return false
    } catch (err) {
      if (err.code === 'EBUSY' || err.code === 'EPERM' || err.code === 'EACCES') {
        return true // Locked, meaning Next.js server is running
      }
    }
  }

  // 2. Process list check
  try {
    const isWindows = process.platform === 'win32'
    const cmd = isWindows ? 'tasklist' : 'ps aux'
    const stdout = execSync(cmd, { encoding: 'utf8' })
    const nodeCount = (stdout.match(/node(\.exe)?/gi) || []).length
    // The clean script itself is 1 node process.
    if (nodeCount > 1) {
      return true
    }
  } catch (e) {
    // Fallback if tasklist is not accessible
  }

  return false
}

function cleanCache() {
  console.log(`Checking build cache status for: ${projectRoot}`)
  
  if (!fs.existsSync(nextDir)) {
    console.log("No .next directory found. Cache is already clean.")
    return
  }

  if (isNextRunning()) {
    console.error("\n[ERROR] Cannot clean .next while the development server may be running.")
    console.error("Stop the server first with Ctrl+C.\n")
    process.exit(1)
  }

  try {
    fs.rmSync(nextDir, { recursive: true, force: true })
    console.log("Removed .next successfully.")
  } catch (err) {
    console.error(`[ERROR] Failed to remove .next directory: ${err.message}`)
    process.exit(1)
  }
}

cleanCache()
