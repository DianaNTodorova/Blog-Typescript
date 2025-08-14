interface BlogPost {
    id: number;
    title: string;
    author: string;
    content: string;
}   
document.addEventListener('DOMContentLoaded', () => {

const postList = document.getElementById('posts') as HTMLDivElement;
const postForm = document.getElementById('blog-form') as HTMLFormElement;
const titleInput = document.getElementById('title') as HTMLInputElement;
const contentInput = document.getElementById('content') as HTMLTextAreaElement;
const authorInput = document.getElementById('author') as HTMLInputElement;

let posts: BlogPost[] = [];

function renderPosts() {
    postList.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="button-container">
            <button class="edit" data-id="${post.id}">
            <span class="material-symbols-outlined">
            border_color
            </span>
            </button>
            <button class="delete" data-id="${post.id}">
            <span class="material-symbols-outlined">
            delete</span>
            </button>
            </div>
            <h3>Title: ${post.title}</h3>
            <p><strong>Author:</strong> ${post.author}</p>
            <p>Content: ${post.content}</p>
  
        `;
        postList.appendChild(postElement);
    });
}


postForm.addEventListener('submit', (event: Event) => {
    event.preventDefault(); 

    const titleValue = titleInput.value.trim();
    const contentValue = contentInput.value.trim();
    const authorValue = authorInput.value.trim();

    if (!titleValue || !authorValue || !contentValue) {
        alert("Please fill in all fields.");
        return;
    }

    const newPost: BlogPost = {
        id: posts.length + 1,
        title: titleValue,
        author: authorValue,
        content: contentValue
    };

    posts.push(newPost);
    renderPosts();
    postForm.reset();   
    titleInput.focus(); 
});
});
