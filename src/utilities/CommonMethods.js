export const convertDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
}

export const dateToUnixStamp = (date) => {
    return new Date(date).getTime();
}

export const getChatUsers = (user1, user2, businessId) => {
    const recievers = [user1, user2];

    const receiver = recievers?.filter((rec) => rec !== undefined && rec?.id !== businessId )[0];

    const sender = recievers?.filter((rec) => rec !== undefined && rec?.id === businessId )[0];

    return { receiver, sender };
}

export const returnDate = (unixStamp) => {

    const date = new Date(unixStamp).toLocaleDateString('en-US').toString();

    const arrDate = date.split('/');

    let month = arrDate[0];

    const day = arrDate[1];

    const year = arrDate[2];

    if(month < 10){
        month = 0+arrDate[0];
    }

    return year + '-' + month + '-' + day;
}

export const comaSeparateNames = (arr) => {
    return arr.length ? arr.map((name, i) => { 
            return name + (i < arr?.length - 1 ? ' ,' : '') 
        })
        : [];
};

export const filterRecordByName = (arr, arrCopy, value) => {
    if(value.length === 0){
        return arrCopy;
    } else{
        if(arr?.length){
            return arr?.filter((item) => 
                item?.firstName ? item.firstName .toLowerCase().indexOf(value.toLowerCase()) !== -1 :
                item?.fullName ? item.fullName .toLowerCase().indexOf(value.toLowerCase()) !== -1 :
                item?.lastName ? item.lastName .toLowerCase().indexOf(value.toLowerCase()) !== -1 :
                item?.name ? item.name .toLowerCase().indexOf(value.toLowerCase()) !== -1 :
                item?.businessName ? item.businessName .toLowerCase().indexOf(value.toLowerCase()) !== -1 
                : item
            );
        }
    }
}

export const uploadFirebaseImage = async (storage, image, callback) => {

    let name = image?.name ? image.name : 'image-name';

    const uploadTask = storage.ref(`images/${name}`).put(image);
    uploadTask.on('state_changed', 
    (snapShot) => {
        console.log(snapShot)
    }, (err) => {
            console.log(err)
    }, async () => {
    
        const url = await storage.ref('images').child(name).getDownloadURL();
        callback(url);
        
    });

}

export const getAboutClientData = (subCategories, categories, preferences) => {
    return categories?.length ? categories?.map((cat) => {
            const subCategory = subCategories?.filter((sub) => sub?.category === cat?.name);
            if(subCategory?.length > 1){
                return subCategory?.map((sub) => { return {
                    category: cat,
                    subCategory: sub,
                    preferences: preferences?.filter((pref) => pref?.subCategory === sub?.name)
                } });
            } else{
                return {
                    category: cat,
                    subCategory: subCategories?.filter((sub) => sub?.categoryId === cat?.id)[0],
                    preferences: preferences?.filter((pref) => pref?.category === cat?.name)
                }
            }
        }) : [];
}