import inquirer from 'inquirer'
import ora from 'ora'
import download from 'download-git-repo';
import * as fs from 'fs'
import chalk from 'chalk';
const templates = {
  '1':'vue_form_vite_template',
  '2':'react_from_vite_template',
}
const createProject = async (name)=>{
  await inquirer.prompt([
    {
      type:'input',
      name: 'projectName',
      message: '请输入项目名称',
      default:name
    },
    {
      type:'input',
      name: 'version',
      message: '请输入版本号',
      default:'0.0.1'
    },
    {
      type: 'list',
      name: 'template',
      message: '请选择模版',
      choices: [
        { name: 'vue3 vite', value: '1' },
        { name: 'react vite', value: '2' },
      ],
      default:'1'
    },
  ]).then(data => {
    // 打印互用输入结果
    downloadTemplate(data.projectName,data.version,data.template)
  })
}
 function downloadTemplate(projectName,version,template) {
  const spinner = ora('正在下载模板...').start();
  if(projectName) {
    download(`github:qazrunning/${templates[template]}`,projectName, function (err) {
      if(!err) {
        editFile({version, projectName }).then(() => {
          spinner.succeed('下载完成');
          console.log(`   `)
          console.log(color(`  cd ${projectName}`,'#4e2a40'))
          console.log(color(`  yarn install`))
          console.log(color(`  yarn dev`))
        });
      } else {
        spinner.fail(`下载失败!`);
      }
    }) 
  }
}
function editFile({ version, projectName }) {
  // console.log(version, projectName, authorName)
  return new Promise((resolve, reject) => {
      // 读取文件
    fs.readFile(`${process.cwd()}/${projectName}/package.json`, (err, data) => {
      if (err) throw err;
      // 获取json数据并修改项目名称和版本号
      let _data = JSON.parse(data.toString())
      _data.name = projectName;
      _data.version = version;
      let str = JSON.stringify(_data, null, 4);
      // 写入文件
      fs.writeFile(`${process.cwd()}/${projectName}/package.json`, str, function (err) {
        if (err) throw err;
      })
      resolve()
    });
  })
};
function color(string,color='#d2b116'){
  return chalk.bold.hex(color)(string)
}
export default createProject
