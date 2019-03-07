const ap = new APlayer({
    container: document.getElementById('aplayer'),
    mini: false,
    autoplay: false,
    theme: '#FADFA3',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: true,
    listMaxHeight: 90,
    lrcType: 3,
    audio: [
        {
            name: '光になる',
            artist: 'Goose house',
            url: 'http://music.163.com/song/media/outer/url?id=35617246.mp3',
            cover: 'https://pic.xiami.net/images/album/img52/91952/10147433001416992941.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill',
            lrc: '/dist/光るなら-Goose house.lrc',
            theme: '#ebd0c2'
        },
        {
            name: 'nc17',
            artist: '菅野よう子',
            url: 'http://music.163.com/song/media/outer/url?id=28786234.mp3',
            cover: 'http://p2.music.126.net/6ziZf93WbSxuCUgOn0fLOA==/109951163024381956.jpg?param=130y130',
            lrc: 'lrc2.lrc',
            theme: '#46718b'
        },
		{
            name: '大人の恋愛',
            artist: '大森靖子',
            url: 'http://music.163.com/song/media/outer/url?id=478686292.mp3',
            cover: 'http://p1.music.126.net/dcJQU4zfAqUcXHJa-3w3YQ==/19067730649022052.jpg?param=300x300',
            lrc: '/dist/大人の恋愛-大森靖子.lrc',
            theme: '#46718b'
        }
    ]
});