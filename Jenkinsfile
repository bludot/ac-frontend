pipeline {
    agent any

    environment {
        GIT_MASTER_BRANCH='master'
        GIT_COMMIT=sh script: 'git rev-parse --verify HEAD', returnStdout: true
        GIT_TAG=sh script: 'git name-rev --name-only --tags HEAD | sed \'s/^undefined$/false/\'', returnStdout: true
    }

    stages {
        stage('Test') {
            steps {
                sh "docker-compose -f docker-compose.ci.yml down"
                sh "docker-compose -f docker-compose.ci.yml build"
                sh "docker-compose -f docker-compose.ci.yml run frontend_ac bash -c 'yarn && yarn test'"
                sh "docker-compose -f docker-compose.ci.yml down"
            }
        }
        stage('Test build') {
            steps {
                sh "docker build -t \$(echo \"$BUILD_TAG\" | tr '[:upper:]' '[:lower:]'):$BUILD_NUMBER ."
                sh "docker image rm \$(echo \"$BUILD_TAG\" | tr '[:upper:]' '[:lower:]'):$BUILD_NUMBER"
                sh "docker image prune -a -f"
            }
        }
        stage('build and push image') {
            
            tools {
            nodejs "node 14.18"
            }
            steps {
                sh '''
                # Run optional required steps before releasing
                npx semantic-release
                '''
            }
            steps {
                script {
                    APP_NAME="harbor.floret.dev/homeac/frontend"
                    VERSION=sh script: "echo \$(node -p \"require('./package.json').version\" | tr -d \'\n\'", returnStdout: true
                    try {
                        docker.withRegistry("https://harbor.floret.dev", "harbor-creds") {
                            //def stagImage = docker.build("$APP_NAME:staging")
                            //stagImage.push()
                            def buildImage = docker.build("$APP_NAME:$VERSION")
                            buildImage.push()
                        }
                    } catch (err) {
                        echo(err.getMessage())
                        error('Unexpected error while pushing to ECR!')
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}