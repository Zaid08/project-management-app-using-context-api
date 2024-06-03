// import {useState} from 'react';
// import {  useContext } from 'react';
// import Modal from './Modal';
// import { AppContext } from '../store/AppContext';

// export default function NewTask() {
//     const {onAddTask} = useContext(AppContext);
//     const [enteredTask, setEnteredTask]=useState('');

//     function handleChange(event){
//         setEnteredTask(event.target.value);
//     }

//     function handleClick() {
//         if(enteredTask.trim() === ''){
//             return;
//         }
//         onAddTask(enteredTask);
//         setEnteredTask('');
//     }

//         return (
//             <div className='flex items-center gap-4'>
//             <input type="text" 
//                 className='w-64 px-2 py-1 rounded-sm bg-stone-300'
//                 onChange={handleChange}
//                 value= {enteredTask}/>
//             <button 
//                 className='text-stone-700 hover:text-stone-950'
//                 onClick={handleClick}>
//                     Add Task
//             </button>
//             </div>
//         );
//     }
import { useRef, useContext } from 'react';
import Modal from './Modal';
import { AppContext } from '../store/AppContext';

export default function NewTask() {
    const {onAddTask, selectedProjectId} = useContext(AppContext);
    const modal = useRef();
    const task = useRef();

    function handleSave() {
        const enteredTask = task.current.value;

        if (enteredTask.trim() === '') {
            modal.current.open();
            return;
        }

        if (!selectedProjectId) {
            alert('No project selected');
            return;
        }

        // onAddTask(enteredTask);
        // task.current.value = '';
        onAddTask(enteredTask, selectedProjectId);
        task.current.value = '';
    }


    return (
        <>
            <Modal ref={modal} buttonCaption='Okay'>
                <h2 className='text-xl font-bold text-stone-700 mt-4 my-4'>Invalid Input</h2>
                <p className='text-stone-600 mb-4'>Oops ... looks like you forget to enter a value.</p>
                <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field.</p>
            </Modal>
            <div className='flex items-center gap-4'>
                <input type="text"
                    className='w-64 px-2 py-1 rounded-sm bg-stone-300'
                    ref={task}
                     />
               
                <button
                    className='text-stone-700 hover:text-stone-950'
                    onClick={handleSave}>
                    Add Task
                </button>
            </div>

        </>
    );
}
