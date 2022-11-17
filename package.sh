version=$(node getVersion.js)

cd build && zip -r contacts-${version}.mds.zip . && mv contacts-${version}.mds.zip ../