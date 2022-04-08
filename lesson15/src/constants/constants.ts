export const constants = {
    AUTHORIZATION: 'Authorization',
    FRONT_END_URL: 'http://localhost:3000',
    EMAIL_REGEXP: /.+@[^@]+\.[^@]{2,}$/,
    PHONE_REGEXP: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,

    PHOTO_MAX_SIZE: 2 * 1024 * 1024, //2Mb
    VIDEO_MAX_SIZE: 20 * 1024 * 1024,

    PHOTOS_MIMETYPES: [
       'image/gif', //.gif
       'image/jpeg', //.jpg, .jpeg
       'image/pjpeg', //.jpeg
       'image/png', //.png
       'image/webp' //.webp
    ],

    VIDEO_MIMETYPES: [
        'video/mp4',
        'video/x-msvideo' //.avi
    ]
}