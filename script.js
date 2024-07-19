document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('video');
    const playPauseButton = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress-bar');
    const muteUnmuteButton = document.getElementById('mute-unmute');
    const volumeSlider = document.getElementById('volume-slider');
    const fullscreenButton = document.getElementById('fullscreen');
    const playbackSpeedButton = document.getElementById('playback-speed');
    const qualityButton = document.getElementById('quality');
    const pipButton = document.getElementById('pip');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('comments-list');
    const likeButton = document.getElementById('like-button');
    const dislikeButton = document.getElementById('dislike-button');
    const shareButton = document.getElementById('share-button');
    const likeCount = document.getElementById('like-count');
    const dislikeCount = document.getElementById('dislike-count');
    const shareCount = document.getElementById('share-count');

    // Sidebar toggle variables
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const body = document.body;

    // Sidebar toggle functionality
    sidebarToggle.addEventListener('click', () => {
        body.classList.toggle('sidebar-open');
    });

    const sidebarCloseButton = document.querySelector('.sidebar-close');
    sidebarCloseButton.addEventListener('click', () => {
        document.body.classList.remove('sidebar-open');
    });

    // Event listener for play/pause button
    playPauseButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Update progress bar as the video plays
    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.value = progress;
    });

    // Allow seeking using the progress bar
    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * video.duration;
        video.currentTime = time;
    });

    // Event listener for mute/unmute button
    muteUnmuteButton.addEventListener('click', () => {
        video.muted = !video.muted;
        muteUnmuteButton.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    // Event listener for volume slider
    volumeSlider.addEventListener('input', () => {
        video.volume = volumeSlider.value;
        if (video.volume === 0) {
            video.muted = true;
            muteUnmuteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            video.muted = false;
            muteUnmuteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    // Event listener for fullscreen button
    fullscreenButton.addEventListener('click', () => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { /* Firefox */
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE/Edge */
            video.msRequestFullscreen();
        }
    });

    // Event listener for playback speed button
    playbackSpeedButton.addEventListener('click', () => {
        const currentSpeed = video.playbackRate;
        const newSpeed = currentSpeed === 1 ? 1.5 : currentSpeed === 1.5 ? 2 : 1;
        video.playbackRate = newSpeed;
        playbackSpeedButton.textContent = `${newSpeed}x`;
    });

    // Event listener for picture-in-picture button
    pipButton.addEventListener('click', () => {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        } else if (video.requestPictureInPicture) {
            video.requestPictureInPicture();
        }
    });

    // Event listener for quality button (example, actual implementation may vary)
    qualityButton.addEventListener('click', () => {
        alert('Quality selection not implemented'); 
    });

    // Event listeners for video actions
    likeButton.addEventListener('click', () => {
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    });

    dislikeButton.addEventListener('click', () => {
        dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
    });

    shareButton.addEventListener('click', () => {
        shareCount.textContent = parseInt(shareCount.textContent) + 1;
    });

    // Event listener for the comment form submission
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const commentText = commentInput.value.trim();

        if (commentText) {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';

            const commentHeader = document.createElement('div');
            commentHeader.className = 'comment-header';

            const commentAuthor = document.createElement('span');
            commentAuthor.className = 'comment-author';
            commentAuthor.textContent = 'User';  // Replace with dynamic user name if available

            const commentDate = document.createElement('span');
            commentDate.className = 'comment-date';
            commentDate.textContent = new Date().toLocaleDateString();

            commentHeader.appendChild(commentAuthor);
            commentHeader.appendChild(commentDate);

            const commentBody = document.createElement('div');
            commentBody.className = 'comment-body';
            commentBody.textContent = commentText;

            const commentActions = document.createElement('div');
            commentActions.className = 'comment-actions';

            const commentLikeButton = document.createElement('button');
            commentLikeButton.className = 'comment-action-button';
            commentLikeButton.innerHTML = '<i class="fas fa-thumbs-up"></i> <span class="comment-like-count">0</span>';

            const commentDislikeButton = document.createElement('button');
            commentDislikeButton.className = 'comment-action-button';
            commentDislikeButton.innerHTML = '<i class="fas fa-thumbs-down"></i> <span class="comment-dislike-count">0</span>';

            const replyButton = document.createElement('button');
            replyButton.className = 'comment-action-button reply-button';
            replyButton.innerHTML = '<i class="fas fa-reply"></i>';

            const editButton = document.createElement('button');
            editButton.className = 'comment-edit-button';
            editButton.innerHTML = '<i class="fas fa-edit"></i>';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'comment-delete-button';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

            commentActions.appendChild(commentLikeButton);
            commentActions.appendChild(commentDislikeButton);
            commentActions.appendChild(replyButton);
            commentActions.appendChild(editButton);
            commentActions.appendChild(deleteButton);

            const replyList = document.createElement('div');
            replyList.className = 'reply-list';

            commentElement.appendChild(commentHeader);
            commentElement.appendChild(commentBody);
            commentElement.appendChild(commentActions);
            commentElement.appendChild(replyList);

            commentsList.appendChild(commentElement);
            commentInput.value = '';

            // Event listener for comment like button
            commentLikeButton.addEventListener('click', () => {
                const likeCount = commentLikeButton.querySelector('.comment-like-count');
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
            });

            // Event listener for comment dislike button
            commentDislikeButton.addEventListener('click', () => {
                const dislikeCount = commentDislikeButton.querySelector('.comment-dislike-count');
                dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
            });

            // Event listener for reply button
            replyButton.addEventListener('click', () => {
                const replyInputContainer = document.createElement('div');
                replyInputContainer.className = 'reply-input-container';

                const replyInput = document.createElement('textarea');
                replyInput.className = 'reply-input';
                replyInput.placeholder = 'Add a public reply...';

                const replyButtonSubmit = document.createElement('button');
                replyButtonSubmit.className = 'reply-button-submit';
                replyButtonSubmit.textContent = 'Reply';

                replyInputContainer.appendChild(replyInput);
                replyInputContainer.appendChild(replyButtonSubmit);

                commentElement.appendChild(replyInputContainer);

                // Event listener for submitting a reply
                replyButtonSubmit.addEventListener('click', () => {
                    const replyText = replyInput.value.trim();

                    if (replyText) {
                        const replyElement = document.createElement('div');
                        replyElement.className = 'comment';

                        const replyHeader = document.createElement('div');
                        replyHeader.className = 'comment-header';

                        const replyAuthor = document.createElement('span');
                        replyAuthor.className = 'comment-author';
                        replyAuthor.textContent = 'User';  // Replace with dynamic user name if available

                        const replyDate = document.createElement('span');
                        replyDate.className = 'comment-date';
                        replyDate.textContent = new Date().toLocaleDateString();

                        replyHeader.appendChild(replyAuthor);
                        replyHeader.appendChild(replyDate);

                        const replyBody = document.createElement('div');
                        replyBody.className = 'comment-body';
                        replyBody.textContent = replyText;

                        replyElement.appendChild(replyHeader);
                        replyElement.appendChild(replyBody);

                        replyList.appendChild(replyElement);

                        commentElement.removeChild(replyInputContainer);
                    }
                });
            });

            // Event listener for edit button
            editButton.addEventListener('click', () => {
                const editText = prompt('Edit your comment:', commentBody.textContent);
                if (editText !== null) {
                    commentBody.textContent = editText;
                }
            });

            // Event listener for delete button
            deleteButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this comment?')) {
                    commentsList.removeChild(commentElement);
                }
            });
        }
    });
    // Video preview on hover
    const thumbnails = document.querySelectorAll('.thumbnail-overlay');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseover', () => {
            const videoPreview = document.createElement('video');
            videoPreview.src = 'path_to_preview_video.mp4'; 
            videoPreview.muted = true;
            videoPreview.autoplay = true;
            videoPreview.loop = true;
            videoPreview.classList.add('video-preview');
            thumbnail.appendChild(videoPreview);
        });

        thumbnail.addEventListener('mouseout', () => {
            const videoPreview = thumbnail.querySelector('.video-preview');
            if (videoPreview) {
                thumbnail.removeChild(videoPreview);
            }
        });
    });
});