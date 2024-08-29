import fse from 'fs-extra';
import path from 'path';

// Get the directory name of the current module
const topDir = new URL('.', import.meta.url).pathname;

fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
fse.copySync(path.join(topDir, 'node_modules', 'tinymce'), path.join(topDir, 'public', 'tinymce'), { overwrite: true });
