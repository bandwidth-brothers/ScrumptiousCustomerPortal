
pipeline{
  agent any
  environment{
    scannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
  }
  stages{
		stage('Checkout'){
			steps{
				checkout scm
			}
		}
    /**
		stage('Analysis'){
      steps{
        nodejs(nodeJSInstallationName: 'node'){
          sh 'npm install --legacy-peer-deps -g @angular/cli'
          sh 'ng test'
          withSonarQubeEnv(installationName:'Sonar Home'){
            sh "${scannerHome}/bin/sonarscanner"
          }
        }
      }
    }		*/
    stage('Build'){
			steps{
        nodejs(nodeJSInstallationName: 'node'){
				  sh 'npm run build-production'
          sh 'ls -l dist/CustomerPortal'
        }
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
