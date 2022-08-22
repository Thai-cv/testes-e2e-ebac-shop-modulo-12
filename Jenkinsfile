pipeline {
    agent any

    stages {
        stage('Clonar o Repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/Thai-cv/testes-e2e-ebac-shop-modulo-12.git'
            }
        }
                
        stage('Instalar dependencias') {
            steps {
            bat 'npm install'    
            }
        }

        stage('Executar Testes') {
            steps {
               bat 'npm run cy:run' 
            }
        }
    }  
}    