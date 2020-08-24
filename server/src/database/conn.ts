import { connect, connection } from 'mongoose';

connect('mongodb://localhost/products-mevn', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection.once('open', () => {
    console.log('>>> DB IS CONNECTED <<');
});

connection.on('error', (err: Error) => {
    console.log('>> DB ERROR:', err.message);
});