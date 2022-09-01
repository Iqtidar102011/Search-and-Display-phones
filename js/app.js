const loadPhones = async (searchValue, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}


const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById("phone_container");
    phoneContainer.textContent = '';
    const showAll = document.getElementById("showAll")
    if (dataLimit && phones.length > 10) {
        // display 10 phones only
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }


    // display no phone found msg
    const noPhone = document.getElementById("no_found_msg");
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }




    // display all phones
    phones.forEach(phone => {
        const { brand, phone_name, image, slug } = phone;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone_name}</h5>
            <p class="card-text">Brand : ${brand}</p>
            <button onclick="loadPhoneDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">>Show Details</button
        </div>
    </div>
        `
        phoneContainer.appendChild(div);
    });

    // stop loader/spinner
    toogleLoader(false);
}

// the common function 
const processSearch = (dataLimit) => {
    // start loader
    toogleLoader(true);

    // as this thing s will be repeated , make a common function for this
    const searchValue = document.getElementById('search_input').value;
    loadPhones(searchValue, dataLimit);
    // document.getElementById('search_input').value = '';
}


// search button handler
document.getElementById("search_btn").addEventListener('click', function () {
    processSearch(10)
    //    here 10 is the limit(how many phones we want to show)
})
// search input field enter key handler
document.getElementById("search_input").addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processSearch(10)
    }
})

const toogleLoader = isTrue => {
    const loaderSection = document.getElementById("loader");
    if (isTrue) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}



// not the best solution for show all

document.getElementById("btn_show_all").addEventListener('click', function () {
    processSearch();
    // in case of show all button , setting no limit , so it will show all phones
})

// phonedetailes

const loadPhoneDetails = async (detailes) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${detailes}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetailes(data.data);

}
const displayPhoneDetailes = phone => {
    const { releaseDate, name, mainFeatures, sensors } = phone
    const modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerText = name;
    const phoneDetails = document.getElementById("phone_detail")
    phoneDetails.innerHTML = `
    <p>release date : ${releaseDate ? releaseDate : 'Release date not found'}</p>;
    <p>storage : ${mainFeatures.storage ? mainFeatures.storage : "not found"}</p>;
    <p>Chipset : ${mainFeatures.chipSet}</p>;
    
   

    


    `
}



loadPhones('oppo');


// {/* <p>sensors : ${mainFeatures.sensors.forEach(sensor => {
        
// })}</p>; */}

// // Promise in JS: Instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future. A promise is said to be settled if it is either fulfilled or rejected, but not pending.
// A Promise is in one of these states:
// pending: initial state, neither fulfilled nor rejected.
// fulfilled: meaning that the operation was completed successfully.
// rejected: meaning that the operation failed.
