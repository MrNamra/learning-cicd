pipeline {
    agent any 

    environment {
        // Define global variables used across stages
        REGISTRY_CREDS = 'docker-hub-credentials-id'
        IMAGE_NAME     = 'my-app'
        IMAGE_TAG      = "${BUILD_NUMBER}" // Uses the unique Jenkins build number
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls code from the configured Git repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing application dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Executing unit tests...'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Push to Registry') {
            steps {
                // Securely handles login using Jenkins credentials provider
                withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDS}", usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo ${PASS} | docker login -u ${USER} --password-stdin"
                    sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application to production server...'
                // Example deployment command (e.g., using SSH, Ansible, or Kubernetes)
                sh "docker run -d -p 80:8080 ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs() // Deletes temporary build files
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
