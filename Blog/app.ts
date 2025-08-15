interface BlogPost {
    id: number;
    title: string;
    author: string;
    content: string;
    timestamp: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('posts') as HTMLDivElement;
    const postForm = document.getElementById('blog-form') as HTMLFormElement;
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const contentInput = document.getElementById('content') as HTMLTextAreaElement;
    const authorInput = document.getElementById('author') as HTMLInputElement;
    const sortSelect = document.getElementById('sort') as HTMLSelectElement;

    // Load posts from localStorage
    let posts: BlogPost[] = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    function savePosts() {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    function renderPosts() {
        postList.innerHTML = '';

        // Sort before rendering
        let sortedPosts = [...posts];
        if (sortSelect?.value === 'author') {
            sortedPosts.sort((a, b) => a.author.localeCompare(b.author));
        } else {
            sortedPosts.sort(
                (a, b) =>
                    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
        }

        sortedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <div class="button-container">
                    <button class="edit" data-id="${post.id}">
                        <span class="material-symbols-outlined">border_color</span>
                    </button>
                    <button class="delete" data-id="${post.id}">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
                <h3>Title: ${post.title}</h3>
                <p><strong>Author:</strong> ${post.author}</p>
                <p>Content: ${post.content}</p>
                <p>Created on: ${post.timestamp}</p>
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
            alert('Please fill in all fields.');
            return;
        }

        const newPost: BlogPost = {
            id: Date.now(), 
            title: titleValue,
            author: authorValue,
            content: contentValue,
            timestamp: new Date().toISOString()
        };

        posts.push(newPost);
        savePosts();
        renderPosts();
        postForm.reset();
        titleInput.focus();
    });

    // handle delete and edit actions
    postList.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const button = target.closest('button');
        const id = button?.getAttribute('data-id');

        if (button?.classList.contains('delete')) {
            posts = posts.filter(post => post.id.toString() !== id);
            savePosts();
            renderPosts();
        } else if (button?.classList.contains('edit')) {
            const post = posts.find(post => post.id.toString() === id);
            if (post) {
                titleInput.value = post.title;
                contentInput.value = post.content;
                authorInput.value = post.author;
                posts = posts.filter(p => p.id.toString() !== id); 
                savePosts();
                renderPosts();
            }
        }
    });

    sortSelect?.addEventListener('change', renderPosts);

 
    renderPosts();
});
