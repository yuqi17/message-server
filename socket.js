module.exports = io => {

    // 关于聊天室
    // https://stackoverflow.com/questions/19150220/creating-rooms-in-socket-io
    // https://socket.io/docs/rooms-and-namespaces/

    let clients = []
    io
        .of('/game')
        .on('connection', socket => {
            const nickname = socket.handshake.query.nickname;
            if (!clients.some(r => r.nickname === nickname)) {
                clients.push({
                    nickname,
                    socket
                });

                let flag = Math.round(Math.random() + 1)

                let other = clients.find(r => r.nickname !== nickname)
                if (other) {
                    other.socket.emit('identified-receiver', {
                        receiver: nickname,
                        role: flag,
                    })

                    socket.emit('identified-receiver', {
                        receiver: other.nickname,
                        role: flag === 1 ? 2 : 1,
                    })
                }
                socket.broadcast.emit('connection', `当前共有${clients.length}个用户在线`)
            }


            socket.on('message', data => {
                let client = clients.find(r => r.nickname === data.receiver)
                if (client) {
                    client.socket.emit('message', data)
                }
            })

            socket.on('disconnect', () => {
                socket.broadcast.emit('offline', nickname + '下线了...')
                clients = clients.filter(r => r.nickname !== nickname)
            })

        })
}