
pipeline{
  agent {
    docker {image "node:latest"}
  }
	stages{
		stage('Checkout'){
			steps{
				checkout scm
			}
		}
		stage('Analysis'){
      steps{
        sh 'npm install'
        sh 'npm run-script lint'
        sh 'npm run-script test'
      }
    }		
    stage('Build'){
			steps{
				sh 'npm run-script build'
        sh 'ls .'
			}
		}
    /**
		stage('Publish'){
			steps{
				withAWS(region: 'us-east-2', credentials: 'aws-creds'){
					s3Upload(bucket: 'ss-scrumptious-artifacts', file: 'target/scrumptious_orders-0.0.1-SNAPSHOT.jar', path: 'order-backend.jar')
				}
			}
		}
		stage('Deploy'){
			steps{
				sh "docker build -t ss-scrumptious-repo:order-backend ."
				script{
					docker.withRegistry("https://419106922284.dkr.ecr.us-east-2.amazonaws.com/","ecr:us-east-2:aws-creds"){
						docker.image("ss-scrumptious-repo:order-backend").push()
					}
				}
				sh "docker system prune -fa"
			}
		}*/
	}
}
