pipeline {
    agent any
    environment {
        CI = 'true'
        HOME = '.'
    }
    stages {
        stage('Build & Test') {
            agent {
                docker {
                    image 'nikolaik/python-nodejs:latest'
                    args '-p 3001:3001'
                }
            }
            steps {
                sh 'rm -rf /var/lib/jenkins/workspace/myvillage-ui/node_modules'
                sh 'yarn install'
                /*sh 'yarn test:e2e'*/
                /*sh 'yarn test:unit'*/
                /*sh yarn lint*/
            }
        }
        stage('Deliver') {
            agent { node { label 'master' } }
            steps {
                sh './script/deploy.sh'
            }
            post {
                success {
                    mail to: 'builds@innovationvillage.co.ug', from: 'TIV DEVOPS <noreply@devops.innovationvillage.co.ug>', subject: '[MYVILLAGE-UI-TEST] New build available!', body: 'Check it out!'
                }
            }
        }
    }
    post {
        failure {
            // Notify developer team of the failure
            mail to: 'builds@innovationvillage.co.ug', from: 'TIV DEVOPS <noreply@devops.innovationvillage.co.ug>', subject: '[YAW-WEB-PROD] Build error', body: "[MYVILLAGE-UI-TEST] Build ${env.BUILD_NUMBER} failed; ${env.BUILD_URL}"
        }
    }
}
