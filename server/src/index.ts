import app from './app';

import './database/conn';
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});