import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const packageJsonPath = path.join(projectRoot, 'package.json')
const nextDir = path.join(projectRoot, '.next')
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

function isNextRunning() {
  if (fs.existsSync(nextDir)) {
    try {
      const tempPath = path.join(projectRoot, `.next_temp_clean_${Date.now()}`)
      fs.renameSync(nextDir, tempPath)
      fs.rmSync(tempPath, { recursive: true, force: true })
      return false
    } catch (err) {
      if (err.code === 'EBUSY' || err.code === 'EPERM' || err.code === 'EACCES') {
        return true
      }
    }
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

function resetDev() {
  verifyEnvironment()

  if (isNextRunning()) {
    console.error("\n[ERROR] Cannot reset development cache while Node/Next.js processes are active.")
    console.error("Please terminate all running development servers first.\n")
    process.exit(1)
  }

  console.log("Proceeding with development reset...")

  if (fs.existsSync(nextDir)) {
    try {
      fs.rmSync(nextDir, { recursive: true, force: true })
      console.log("✓ Cleared Next.js build cache (.next)")
    } catch (err) {
      console.error(`[WARNING] Could not clear .next cache: ${err.message}`)
    }
  } else {
    console.log(".next cache does not exist. Skipping.")
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
