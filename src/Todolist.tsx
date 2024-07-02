import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addTask(newTitle, props.id);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }


    // const [todoFromServer, setTodoFromServer] = useState<Array<ObjectType>>([
    //     {
    //         todolistId: v1(),
    //         title: "What to learn",
    //         filter: "all",
    //         tasks: [
    //             {taskId: v1(), title: "HTML&CSS", isDone: true},
    //             {taskId: v1(), title: "JS", isDone: true}
    //         ],
    //         students: [
    //             'Rick Kane',
    //             'Finnlay Bentley',
    //             'Samia North',
    //             'Isaac Morton',
    //             'Lily-Ann Clifford',
    //             'Thalia Park',
    //             'Sapphire Cruz',
    //             'Cieran Vazquez',
    //             'Anya Estes',
    //             'Dominika Field',
    //             'Rosanna Chung',
    //             'Safiyah Davey',
    //             'Ryley Beasley',
    //             'Kalvin Trejo',
    //             'Evie-Mae Farrell',
    //             'Juliet Valencia',
    //             'Astrid Austin',
    //             'Lyle Montgomery',
    //             'Nisha Mora',
    //             'Kylie Callaghan',
    //             'Star Wilks',
    //             'Marissa Colley',
    //             'Asa Fuller',
    //             'Leigh Kemp',
    //             'Avleen Dawson',
    //             'Sammy Bonilla',
    //             'Acacia Becker',
    //             'Coral Shepherd',
    //             'Melina Molina',
    //             'Kiran Bailey',
    //             'Clara Escobar',
    //             'Alexandru Horn',
    //             'Brandon-Lee Mercado',
    //             'Elouise Weston',
    //             'King Long',
    //             'Kerri Searle',
    //             'Kanye Hamer',
    //             'Elwood Benitez',
    //             'Mikail Whitaker',
    //             'Bobby Hardy',
    //             'Talha Ferry',
    //             'Priscilla Landry',
    //             'Olivia-Grace Cain',
    //             'Kiaan Wallace',
    //             'Wesley Padilla90',
    //             'Ella-Grace Wooten91',
    //             'Kaif Molloy92',
    //             'Kamal Broadhurst93',
    //             'Bianca Ferrell94',
    //             'Micheal Talbot95',
    //         ]
    //     },
    //     {
    //         todolistId: v1(),
    //         title: "What to do",
    //         filter: "all",
    //         tasks: [
    //             {taskId: v1(), title: "HTML&CSS2", isDone: true},
    //             {taskId: v1(), title: "JS2", isDone: true}
    //         ],
    //         students: [
    //             'Jago Wormald1',
    //             'Saul Milne2',
    //             'Aariz Hester3',
    //             'Dion Reeve4',
    //             'Anisa Ortega5',
    //             'Blade Cisneros6',
    //             'Malaikah Phelps7',
    //             'Zeeshan Gallagher8',
    //             'Isobella Vo9',
    //             'Rizwan Mathis10',
    //             'Menaal Leach11',
    //             'Kian Walton12',
    //             'Orion Lamb13',
    //             'Faizah Huynh14',
    //             'Crystal Vaughan15',
    //             'Vivien Hickman16',
    //             'Stuart Lu17',
    //             'Karol Davison18',
    //             'Dario Burns19',
    //             'Chloe Rich20',
    //             'Martyna Felix',
    //             'Nida Glass',
    //             'Maeve Miles',
    //             'Hasnain Puckett',
    //             'Ayman Cano',
    //             'Safwan Perry',
    //             'Fox Kelly',
    //             'Louise Barlow',
    //             'Malaki Mcgill',
    //             'Leanna Cline',
    //             'Willard Hodge',
    //             'Amelia Dorsey',
    //             'Kiah Porter',
    //             'Jeanne Daly',
    //             'Mohsin Armstrong',
    //             'Laurie Rangel',
    //             'Princess Tierney',
    //             'Kasim Kendall',
    //             'Darryl Cope',
    //             'Elysha Ray',
    //             'Liyana Harris',
    //             'Kashif Blackburn',
    //             'Atif Zimmerman',
    //             'Sila Hartley',
    //             'Ralphie Hebert',
    //         ]
    //     }
    // ])

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3> {props.title}
            <button onClick={removeTodolist}>x</button>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.taskId, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


