import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const nextDevDir = path.join(projectRoot, '.next-dev')
const nextBuildDir = path.join(projectRoot, '.next')

function isDirLocked(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      const tempPath = path.join(projectRoot, `${path.basename(dirPath)}_temp_clean_${Date.now()}`)
      fs.renameSync(dirPath, tempPath)
      fs.rmSync(tempPath, { recursive: true, force: true })
      return false
    } catch (err) {
      if (err.code === 'EBUSY' || err.code === 'EPERM' || err.code === 'EACCES') {
        return true
      }
    }
  }
  return false
}

function isNextRunning() {
  if (isDirLocked(nextDevDir) || isDirLocked(nextBuildDir)) {
    return true
  }

  try {
    const isWindows = process.platform === 'win32'
    const cmd = isWindows ? 'tasklist' : 'ps aux'
    const stdout = execSync(cmd, { encoding: 'utf8' })
    const nodeCount = (stdout.match(/node(\.exe)?/gi) || []).length
    if (nodeCount > 1) {
      return true
    }
  } catch (e) {
    // ignore
  }

  return false
}

function cleanCache() {
  console.log(`Checking build cache status for: ${projectRoot}`)

  if (isNextRunning()) {
    console.error("\n[ERROR] Cannot clean cache while Next.js server may be running.")
    console.error("Stop the server first with Ctrl+C.\n")
    process.exit(1)
  }

  let cleaned = false;
  if (fs.existsSync(nextDevDir)) {
    try {
      fs.rmSync(nextDevDir, { recursive: true, force: true })
      console.log("Removed .next-dev successfully.")
      cleaned = true;
    } catch (err) {
      console.error(`[ERROR] Failed to remove .next-dev directory: ${err.message}`)
      process.exit(1)
    }
  }

  if (fs.existsSync(nextBuildDir)) {
    try {
      fs.rmSync(nextBuildDir, { recursive: true, force: true })
      console.log("Removed .next successfully.")
      cleaned = true;
    } catch (err) {
      console.error(`[ERROR] Failed to remove .next directory: ${err.message}`)
      process.exit(1)
    }
  }

  if (!cleaned) {
    console.log("No cache directories found. Already clean.")
  }
}

cleanCache()
