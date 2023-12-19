exports.runCode = async(req, res) => {
    const language = "java"
    const code = req.body.code
    const className = req.body.className

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body" })
    }
    try {
        const filePath = await generateFile(language, code, className)
        const output = await executeJava(filePath, className)
        return res.status(200).json({
            success: true,
            filePath: filePath,
            output: output
        })
    } catch (err) {
        return res.status(500).json({ error: err })
    }



}

//file path generating for code
const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')

const dirCode = path.join(__dirname, "codes")

if (!fs.existsSync(dirCode)) {
    fs.mkdirSync(dirCode, { recursive: true })
}

const generateFile = async(format, content, className) => {
    const jobId = uuid()
    const fileName = `${className}.${format}`
    const filePath = path.join(dirCode, fileName)
    await fs.writeFileSync(filePath, content)
    return filePath

}

//executing the code
const { exec } = require('child_process');


const dirOutput = path.join(__dirname, 'outputs');

if (!fs.existsSync(dirOutput)) {
    fs.mkdirSync(dirOutput, { recursive: true });
}

const executeJava = (filePath, className) => {
    const jobId = path.basename(filePath, '.java');
    const outPath = path.join(dirOutput, `${jobId}.class`);

    return new Promise((resolve, reject) => {
        exec(`javac ${filePath} -d ${dirOutput} && cd ${dirOutput} && java ${className}`, (
            error, stdout, stderr
        ) => {
            error && reject({ error, stderr })
            stderr && reject(stderr)
            resolve(stdout)
        });
    });
};