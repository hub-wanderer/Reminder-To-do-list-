const new_remander_btn = document.querySelector('.create_new_remander'); // button for new R
const maincontent = document.querySelector('.container'); // mein container
const containerCr = document.querySelector('.containerCr'); // container creating reminders
const cancel_btn = document.querySelector('.cancel_btn'); 
const add_btn = document.querySelector('.add_btn');
const remainders_btn = document.querySelector('.remainders'); //button to open list of remiders
const containerList = document.querySelector('.containerList'); // container with list of reminders
const back_to_lists_btn = document.querySelector('#back_to_lists');
const remindersListsUl = document.querySelector('.remindersLists'); // ul

const name_input = document.querySelector('.name_input');
const note_input = document.querySelector('.note_input');

const countAll = document.querySelector('#countAll');

const fix_issue_btn = document.querySelector('.fix_issue');

let creation_reminderOpen = false; 
let list_remindersOpen = false;
let isChecked = false;
let isunavalble = true;
let counts = parseInt(localStorage.getItem('saveCount')) || 0;

fix_issue_btn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})

new_remander_btn.addEventListener('click', () => {
    creation_reminderOpen = !creation_reminderOpen;

    if(!creation_reminderOpen){
        openModalNewR();
    }
});
cancel_btn.addEventListener('click', () => {

    creation_reminderOpen = !creation_reminderOpen;
    if(creation_reminderOpen){
        closeModalNewR();
    }
});
remainders_btn.addEventListener('click', () => {
    list_remindersOpen = !list_remindersOpen;
    if(!list_remindersOpen){
        openModalList();
    }
});
back_to_lists_btn.addEventListener('click', () => {
    list_remindersOpen = !list_remindersOpen;
    if(list_remindersOpen){
        closeModalList();

        const checkedItems = remindersListsUl.querySelectorAll('.checked');
        if(isChecked){
            checkedItems.forEach((item) => {
                item.remove();
            });
            countAll.innerHTML = parseInt(countAll.innerHTML) - checkedItems.length;
            
            saveData();
        }
    }
})

function openModalNewR(){
    maincontent.style.display = 'none';
    containerCr.style.display = 'block';
};
function closeModalNewR(){
    maincontent.style.display = 'block';
    containerCr.style.display = 'none';
};

function openModalList(){
    maincontent.style.display = 'none';
    containerList.style.display = 'block';
};
function closeModalList(){
    maincontent.style.display = 'block';
    containerList.style.display = 'none';
};
addnewTask();
function addnewTask(){
    add_btn.addEventListener('click', () => {

        add_btn.disable = true;

        if(name_input.value.trim() !== ''){
            let li = document.createElement('li');
            li.innerHTML = name_input.value;
            remindersListsUl.appendChild(li);
            addnewTask();
            CountPlus();

            isunavalble = !isunavalble;
            add_btn.disable = false;
            if(isunavalble){
                add_btn.classList.remove('unavalble');
            }
        }
        else{
            isunavalble = !isunavalble;
            if(!isunavalble){
                add_btn.classList.add('unavalble');
            }
            add_btn.disable = true;
        }
        name_input.value = '';
        saveData();
    })
};
function CountPlus(){
    counts++;

    countAll.innerHTML = counts;
    saveData();
};
remindersListsUl.addEventListener('click', (evt) => {
    isChecked = !isChecked;

    if(isChecked){
        evt.target.classList.add('checked');
    }
    else{
        evt.target.classList.remove('checked');
    }
    saveData();
});

function updateCheckedItem(){
    let checkedItem = remindersListsUl.querySelectorAll('.checked');
    countAll.innerHTML = checkedItem.length;
}

function saveData(){
    localStorage.setItem('saveData', remindersListsUl.innerHTML);
    localStorage.setItem('saveCount', countAll.innerHTML);
};
function getData(){
    remindersListsUl.innerHTML = localStorage.getItem('saveData');
    countAll.innerHTML = localStorage.getItem('saveCount') || 0;
};
getData();