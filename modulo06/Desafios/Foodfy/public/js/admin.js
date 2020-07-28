// Active menu
const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .menu a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

const RecipeFields = {
  addIngredient() {
    const ingredients = document.querySelector('#ingredients');
    const fieldContainer = document.querySelectorAll('.ingredient');
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
    if (newField.children[0].value == "") return false;
    newField.children[0].value = "";
    ingredients.appendChild(newField);
  },

  addPreparation() {
    const preparation = document.querySelector('#preparation');
    const fieldCOntainer = document.querySelectorAll('.step');
    const newField = fieldCOntainer[fieldCOntainer.length - 1].cloneNode(true);
    if (newField.children[0].value == "") return false;
    newField.children[0].value = "";
    preparation.appendChild(newField);
  }
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    path: "",
    files: [],
    
    handleFileInput(e) {
        const { files: fileList } = e.target;
        PhotosUpload.input = e.target;

        if (PhotosUpload.hasLimit(e)) return;

        Array.from(fileList).forEach(file => {
        PhotosUpload.files.push(file);
        const reader = new FileReader();

        reader.onload = () => {
            const image = new Image();
            image.src = String(reader.result);
            const container = PhotosUpload.getContainer(image);
            PhotosUpload.preview.appendChild(container);
        }
            
        reader.readAsDataURL(file);
        });
        
        PhotosUpload.input.files = PhotosUpload.getAllFiles();
    },

    hasLimit(e) {
        const { uploadLimit, input, preview } = PhotosUpload;
        const { files: fileList } = input;

        if (fileList.length > uploadLimit) {
        alert(`Envie no máximo ${uploadLimit} fotos`);
        e.preventDefault();
        return true;
        }

        const photosContainer = [];
        preview.childNodes.forEach(item => {
        if (item.classList && item.classList.value == "photo") photosContainer.push(item);
        });

        const totalPhotos = fileList.length + photosContainer.length;
        if (totalPhotos > uploadLimit) {
        alert('Você atingiu o limite máximo de fotos');
        e.preventDefault();
        return true;
        }

        return false;
    },
  
  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();
    PhotosUpload.files.forEach(file => dataTransfer.items.add(file));
    return dataTransfer.files;
  },
  
  getContainer(image) {
    const container = document.createElement('div');
    container.classList.add('photo');
    container.onclick = PhotosUpload.removePhoto;
    container.appendChild(image);
    container.appendChild(PhotosUpload.getRemoveButton());
    return container;
  },
  
  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = "close";
    return button;
  },
  
  removePhoto(e) {
    const photoContainer = e.target.parentNode;
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoContainer);

    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();

    photoContainer.remove();
  },
  
  removeOldPhoto(e) {
    const photoContainer = e.target.parentNode;
      
    if (photoContainer.id) {
      const removedFiles = document.querySelector('input[name="removed_files"]');
      if (removedFiles) removedFiles.value += `${photoContainer.id},`;
    }

    photoContainer.remove();  
  }
}

const PhotoSelected = {
  mainPhoto: document.querySelector('.img img'),
  highlights: document.querySelectorAll('.highlights img'),

  highlightPhoto(e) {
    const selected = e.target;

    for (image of PhotoSelected.highlights) {
      image.classList.remove('selected');
    }

    selected.classList.add('selected');

    PhotoSelected.mainPhoto.src = selected.src;
    PhotoSelected.mainPhoto.alt = selected.alt;
  }
}