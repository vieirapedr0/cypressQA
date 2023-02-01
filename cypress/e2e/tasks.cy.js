/// <reference types="cypress" />


describe('tarefas', () => {

    let testData;
    before(() => {
        cy.fixture('tasks').then(t =>{
            testData = t
        })
    });

   

    context('cadastro', ()=>{

        it('deve cadastrar uma nova tarefa', () => {

            const TaskName = 'Ler um livro de Node.js'
    
            cy.removeTaskByName(TaskName)
    
            cy.createTask(TaskName)
    
            cy.contains('main div p', TaskName).should('be.visible')
    
        });

        it('não deve permitir tarefa duplicada', () => {
    
            const task = testData.dup
    
            cy.removeTaskByName(task.name)
    
            cy.postTask(task)
            
            cy.createTask(task.name)
            
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        });

        it('campo obrigatorio', () => {
            cy.createTask()
    
            cy.isRequired('This is a required field')
    
        });
    })

    context('atualizacao', () =>{

        it('deve concluir uma tarefa', () => {
            const task = {
                name:'Pagar contas de consumo',
                is_done: false
            }
            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()
            
            cy.contains('p', task.name).should('have.css','text-decoration-line', 'line-through')
            

        });

    })

    context('remover uma tarefa', () =>{

        it('deve concluir uma tarefa', () => {
            const task = {
                name:'Estudar JavaScript',
                is_done: false
            }
            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()
            
            cy.contains('p', task.name).should('not.exist')
            

        });

    })

});

