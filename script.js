const notesEls = document.querySelector('.notes');



//create note initially
createNote();

    
//create new note on DOM
function createNote(){

    const noteEl = document.createElement('div');
    noteEl.classList.add('note-container');
    noteEl.innerHTML = `
   <div class='note'> 
    <div class="note-header">
                <i class="fas fa-edit" id="edit"></i>
                <i class="fas fa-plus" id="add"></i>
                
                <i class="fas fa-times" id="remove"></i>
                
                </div>
                <textarea class="text-area" placeholder="Write down your note here"></textarea>
            <div class="main-note">
            </div>
            <div class='note-footer'>
            <button class="save-btn">
                SAVE
            </button>
            </div>
            </div>  
    `
   
    notesEls.appendChild(noteEl); 

    //for each note to act individual we have to initailise and use them here
    const removeBtn = noteEl.querySelector('#remove');
    const editBtn = noteEl.querySelector('#edit');
    const saveBtn = noteEl.querySelector('.save-btn');
    const addBtn = noteEl.querySelector('#add');
    const textArea = noteEl.querySelector('.text-area');
    const mainNote = noteEl.querySelector('.main-note');


    //on text area change
    textArea.addEventListener('input' , (e) => {
        const { value } = e.target;
        mainNote.innerText = `
        ${value}
        `
     });

     //on remove btn click
    removeBtn.addEventListener("click" , ()=> {
     console.log(notesEls.innerHTML.length)
     if(notesEls.innerHTML.length>628){ //if there is more than one element its size will be more than this (size canges as we add elements)
        noteEl.remove();
        
        //after removeing of note ressizing of note 
        //short:the current note will be removed and the note behind it will come ahead
        for(let i=notesEls.childNodes.length - 1  ; i>=1 ; i--){
            const note = notesEls.childNodes[i];
              note.style.transform = `translateY(${10*i}px) scaleX(${0.7+(0.1*(i))})`;
              note.style.zIndex = `${i*+1}`
        }
     }  
    });
   
    //on edit btn click
    editBtn.addEventListener("click" , ()=> {
        textArea.style.display = 'block';
        mainNote.style.display = 'none';
        saveBtn.style.display = 'block';
     });

     //on save btn click
     saveBtn.addEventListener("click" , ()=> {
        textArea.style.display = 'none';
        mainNote.style.display = 'block';
        saveBtn.style.display = 'none';
        // console.log(notesEls.childNodes[1]);
        // console.log(notesEls.childNodes[2]);
        
     });

     //on add btn click
     addBtn.addEventListener("click" , ()=> {
      createNote();
      
      //for ressizzing after creating of new not
      //short:new note will have orignal position whethre previous one will get behind the new one 
      for(let i=2 ; i<notesEls.childNodes.length ; i++){
          const note = notesEls.childNodes[i-1];
            note.style.transform = `translateY(${-10*i}px) scaleX(${1-(0.1*i)})`;
            note.style.zIndex = `${i*-1}`
      }

 
     });
}
