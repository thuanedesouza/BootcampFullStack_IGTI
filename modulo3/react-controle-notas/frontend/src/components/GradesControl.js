import React from 'react'
import Action from './Action';

export default function GradesControl({ grades, onDelete, onPersist }) {
    const tableGrades = [];
    let currentStudent = grades[0].student;
    let currentSubject = grades[0].subject;
    let currentGrades = [];
    let id = 1;
    grades.forEach((grade) => {
        if (grade.subject != currentSubject) {
            //alimentando a table pq ta diferente
            tableGrades.push({
                id: id++,
                student: currentStudent,
                subject: currentSubject,
                grades: currentGrades
            });
            currentSubject = grade.subject;
            currentGrades = [];
        }
        if (grade.student !== currentStudent) {
            currentStudent = grade.student;
        }
        currentGrades.push(grade);
    });
    // após o loop é necessário inserir o último elemento
    tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades
    })


    const handleActionClick = (id, type)=>{
        console.log(id);
        console.log(type);
    
      const grade = grades.find(grade => grade.id === id);
        if (type === 'delete'){
           onDelete(grade);
           return;
       }
       onPersist(grade);
       //if e else é menos comum no mercado
    }


    return (
        <div className="container center">

            {tableGrades.map(({ id, grades }) => {
                const finalGrade = grades.reduce((acc,cur)=> {
                    return acc + cur.value;
                }, 0)
                const gradeStyle= finalGrade> 70 ? styles.goodGrade : styles.badGrade;

                return <table styles = {styles.table} className="striped center" key={id}>

                    <thead>
                        <tr>
                            <th>Aluno</th>
                            <th>Disciplina</th>
                            <th>Avaliação</th>
                            <th>Nota</th>
                            {/* non breaking space, aqui vai entrar ação */}
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map(({ id, subject, student, type, value, isDeleted }) => {
                            return (<tr key={id}>
                                <td style={{ width: '20%' }}>{student}</td>
                                <td style={{ width: '20%' }}>{subject}</td>
                                <td style={{ width: '20%' }}>{type}</td>
                                <td style={{ width: '20%' }}>{isDeleted ? '-' : value}</td>
                                <td style={{ width: '20%' }}> 
                                    <div>
                                    <Action onActionClick = {handleActionClick} id ={id} type = {isDeleted ? 'add': 'edit'} />
                                    {!isDeleted && <Action onActionClick = {handleActionClick} id ={id} type = "delete" />}
                                    </div>
                                </td>
                            
                                <td style={{ width: '20%' }}>&nbsp;</td>
                            </tr>);
                        })}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td style = {{textAlign: 'right'}}>
                                <strong>Total</strong>
                                </td>
                            <td><span style = {gradeStyle}>{finalGrade}</span></td>
                        </tr>

                    </tfoot>
                </table>

            })
            
            }
        </div>
    )
   
}

const styles = {
    goodGrade: {
        fontWeight:'bold',
        color:'green'
    },
    badGrade: {
        fontWeight:'bold',
        color:'red'
    },
    table: {
        margin: '20px',
        padding: '10px'
    }
}