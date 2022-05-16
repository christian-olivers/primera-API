console.log("estamos listos");
const instance = axios.create({
    baseURL: 'https://api.thedogapi.com/v1'
});
instance.defaults.headers.common['x-api-key'] = '93281cee-4d7f-4c6d-abc9-62c790323eb1';
const key = '93281cee-4d7f-4c6d-abc9-62c790323eb1';
const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=6&api_key="+key;
const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites";
const API_URL_DELATE_FAVORITES = 'https://api.thedogapi.com/v1/favourites/'; 
const API_URL_UPLOAD = "https://api.thedogapi.com/v1/images/upload";


const getRandomImage = async() => {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
        console.log("get Image")
        console.log(data);

    if(res.status !== 200){
        console.log("Error: "+ res.status);
    }else {
        const container = document.getElementById('cards');
        container.innerHTML= "";
        const h2 = document.createElement('h2');
        const texth2 = document.createTextNode('Radndom Images');
        h2.appendChild(texth2);
        data.forEach(dog => {
            const container = document.getElementById('cards');
            const contentImg = document.createElement('article');
            const img = document.createElement('img');
            const btnSvg = document.createElement('div');
            btnSvg.setAttribute("id", "start"+dog.id);
            btnSvg.setAttribute("class", "start");
            const backbtn = document.createElement('div');
            backbtn.setAttribute("class","circle-start");

            img.src =  dog.url;
            container.appendChild(contentImg);
            contentImg.appendChild(img);
            backbtn.appendChild(btnSvg);
            contentImg.appendChild(backbtn);

            btnSvg.onclick = () => saveImageFavorites(dog.id);
        });
        


    };
};

// const getDogBreeds = async() => {
//     const res = await fetch(API_URL_RANDOM);
//     const data = await res.json();
//         console.log("get Image")
//         console.log(data);

//     if(res.status !== 200){
//         console.log("Error: "+ res.status);
//     }else {
//         const container = document.getElementById('cards');
//         container.innerHTML= "";
//         const h2 = document.createElement('h2');
//         const texth2 = document.createTextNode('Radndom Images');
//         h2.appendChild(texth2);
//         data.forEach(dog => {
//             const container = document.getElementById('cards');
//             const contentImg = document.createElement('article');
//             const headerImg = document.createElement('div');
//             headerImg.setAttribute("class","title-image");
//             const p = document.createElement('p');
//             const textP = document.createTextNode(dog.name);
//             p.appendChild(textP);

//             // console.log(dog.breeds[0].name);
//             const img = document.createElement('img');
//             const btnSvg = document.createElement('div');
//             btnSvg.setAttribute("id", "start"+dog.id);
//             btnSvg.setAttribute("class", "start");
//             const backbtn = document.createElement('div');
//             backbtn.setAttribute("class","circle-start");

//             img.src =  dog.image.url;
//             headerImg.appendChild(p);
//             container.appendChild(contentImg);
//             contentImg.appendChild(img);
//             backbtn.appendChild(btnSvg);
//             contentImg.appendChild(backbtn);
//             contentImg.appendChild(headerImg);
//             btnSvg.onclick = () => saveImageFavorites(dog.id);
//         });
//     };
// };


const getImagesFavorites = async() => {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': key,
        },
    });
    const data = await res.json();
    console.log("get Favorites")
    console.log(data);

    if(res.status !== 200){
        console.log("Error: "+ res.status +" "+ data.message);
    } else {
        const container = document.getElementById('favorites-container');
        container.innerHTML= "";
        const h2 = document.createElement('h2');
        const texth2 = document.createTextNode('Our Favorite Dog');
        h2.appendChild(texth2);
        data.forEach(dog => {
            
            const contentImg = document.createElement('article');
            const img = document.createElement('img');
            const btnSvg = document.createElement('div');
            btnSvg.setAttribute("class", "start");
            const backbtn = document.createElement('div');
            backbtn.setAttribute("class","circle-start");
            // const btnText = document.createTextNode('unfavorite');

            // btn.appendChild(btnText);
            img.src =  dog.image.url;
            
            backbtn.appendChild(btnSvg);
            contentImg.appendChild(img);
            contentImg.appendChild(backbtn);

            container.appendChild(contentImg);

            btnSvg.onclick = () => delateImagesFavorites(dog.id);
        });
    }
};

const saveImageFavorites = async(id, dir) => {
    const {data, status} = await instance.post('/favourites', {
        image_id: id,
    });
// ------------ con fetch ----------------------
    // console.log('start'+id);
    // console.log("el id es "+ id);
    // const res = await fetch(API_URL_DELATE_FAVORITES, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-api-key': key,
    //     },
    //     body: JSON.stringify({
    //         'image_id': id,
    //     }),
    // });
    // const data = await res.json();
    console.log('save '+id);
        if(dir !== "up"){
        const element = document.getElementById('start'+id);
        element.classList.add('start-active');
        }

    if(status !== 200){
        console.log("Error: "+ status +" "+ data.message)
    }else {
        getImagesFavorites();
    }
};

const delateImagesFavorites = async(id) => {
    const res = await fetch(API_URL_DELATE_FAVORITES+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': key,
        },
    });
    const data = await res.json();

    if(res.status !== 200){
        console.log("Error: "+ res.status +" "+ data.message);
    } else {
        console.log("si elimina");
        getImagesFavorites();
    }
};

const another =() => {
    getRandomImage();
};

const uploadPicturi = async() => {
    const form = document.getElementById('uploadFile');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            'x-api-key': key,
        },
        body: formData,
    });
    const data = await res.json();

    if(res.status !== 201){
        console.log("Error: "+ res.status +" "+ data.message);
    } else {
        console.log("imagen subida");
        console.log({data});
        console.log(data.url, "up");
        saveImageFavorites(data.id, "up");
    }

}

//---------- con axios -------------
const previewUploadImages = async() => {    
    const {data, status} = await instance.get('/images');
    console.log(data);

    if(status !== 200){
        console.log("Error: "+ res.status +" "+ data.message);
    } else {
        const container = document.getElementById('upload-container');
        container.innerHTML= "";
        data.forEach(dog => { 
            const contentImg = document.createElement('article');
            const img = document.createElement('img');
            img.src =  dog.url;
            contentImg.appendChild(img);
            container.appendChild(contentImg);
        })
    }
    

}

function previewFile() {
    console.log("entra a imagen")
    const preview = document.getElementById('img-view');
    const file = document.getElementById('file-up').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convierte la imagen a una cadena en base64
      preview.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

getRandomImage();
getImagesFavorites();

    