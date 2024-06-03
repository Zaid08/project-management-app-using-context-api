import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
import { AppContext } from "./store/AppContext";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    
    projects: [],
    tasks: [],
  });

  function handleAddTask(text, projectId) {
    setProjectState(prevState => {
        const taskId = Math.random();
        const newTask = {
            text: text,
            id: taskId,
        };

        return {
            ...prevState,
            tasks: {
                ...prevState.tasks,
                [projectId]: [newTask, ...(prevState.tasks[projectId] || [])],
            },
        };
    });
}
  

function handleDeleteTask(taskId) {
  setProjectState(prevState => {
    const projectId = prevState.selectedProjectId;
    return {
      ...prevState,
      tasks: {
        ...prevState.tasks,
        [projectId]: prevState.tasks[projectId].filter(task => task.id !== taskId),
      },
    };
  });
}

  

  

  function handleSelectProject(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
          ...projectData,
          id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects:[...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: prevState.projects.filter(
          (project) => project.id !==prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = (
    <SelectedProject/>
  );

  if(projectState.selectedProjectId === null){
    content = <NewProject />
  }
  else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected/>
  }
  
  let ctxValue = {
    onStartAddProject:handleStartAddProject,
    projects: projectState.projects,
    onSelectProject: handleSelectProject,
    selectedProjectId: projectState.selectedProjectId,
    project: selectedProject,
    onDelete: handleDeleteProject,
    onDeleteTask: handleDeleteTask,
    tasks: projectState.tasks,
    onAddTask: handleAddTask,
    onAdd: handleAddProject,
    onCancel: handleCancelAddProject,
    
  }

  return (
   <AppContext.Provider value={ctxValue}>
      <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar/>
    {content}
   </main>
   </AppContext.Provider>
  );
}

export default App;
