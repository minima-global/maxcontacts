version=$(node getVersion.js)

cd build && zip -r contacts_DEV-${version}.mds.zip . && mv contacts_DEV-${version}.mds.zip ../