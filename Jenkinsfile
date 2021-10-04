
pipeline{
	agent any
	stages{
		stage('Checkout'){
			steps{
				checkout scm
			}
		}
		stage('Analysis'){
      steps{
        sh 'npm install --legacy-peer-deps'
        sh 'ng test'
      }
    }		
    stage('Build'){
			steps{
				sh 'ng build'
        sh 'ls ./dist'
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
