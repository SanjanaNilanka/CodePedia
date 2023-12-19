const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')

const dirCode = path.join(__dirname, "codes")

if (!fs.existsSync(dirCode)) {
    fs.mkdirSync(dirCode, { recursive: true })
}

const generateFile = async(format, content) => {
    const jobId = uuid()
    const fileName = `${jobId}.${format}`
    const filePath = path.join(dirCode, fileName)
    await fs.writeFileSync(filePath, content)
    return filePath

}