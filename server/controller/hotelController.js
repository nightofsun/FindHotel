import Hotel from '../model/hotelModel.js';
const prodFeildProjection = {
    __v: false
};

// const list = (req, res) => {
//     Hotel.find()
//         .then(result => res.json(result))
//         .catch(err => res.status(500).send({ errors: { global: "Server Error" } }))
// };

// const create = (req, res) => {
//     let hotel = new Hotel(req.body);
//     hotel.save()
//         .then(() => { return res.send({ success: 'Create Successfully' }) })
//         .catch(() => res.status(404).send({
//             errors: { global: "Cann't add new hotel" }
//         }))
// };
// const getPage = (req, res) => {
//     const page = req.params.page;
//     const start = (page * 8) - 8;
//     const end = 8;
//     //console.log(`start ${start}, end ${end}`);
//     Hotel.count().then(count => {
//         Hotel.find().skip(start).limit(end)
//             .then(hotel => {
//                 //console.log(hotel);
//                 if (!hotel) {
//                     return res.status(404).send({
//                         error: {
//                             global: 'Hotel not found with page ' + page
//                         }
//                     });
//                 }
//                 let value = {
//                     totalPage: Math.ceil(count / 10),
//                     list: hotel
//                 }
//                 res.json([value]);
//             }).catch(err => {
//                 return res.status(500).send({
//                     error: {
//                         global: 'Error retrieving Hotel with page ' + page
//                     }
//                 });
//             })
//     })
//         .catch(err => {
//             return res.status(500).send({
//                 error: {
//                     global: 'Error retrieving Hotel with page ' + page
//                 }
//             });
//         });

// }

const getPageFilter = (req, res) => {
    const page = req.params.page;
    const params = req.params;
    //console.log(params);
    const filter = {
        status: 'public'
    };
    const start = (page * 8) - 8;
    const size = 8;
    if (params.district != 'ทั้งหมด') {
        filter.district = params.district;
        //console.log("aaa");
    }
    if (params.bed != 'ทั้งหมด') {
        filter.bedType = params.bed;
        //console.log("aaa");
    }
    if(params.landmark!= 'ทั้งหมด'){
        filter.landMark = params.landmark;
        //console.log("aaa");
    }
    if(params.searchkey!='-'){
        //console.log(body)
        filter.name = {
            $regex: `.*${params.searchkey}.*`
        }
       // console.log("aaa");
    }
    filter.$and = [{ price: { $lt: params.highprice } }, { price: { $gt: params.lowprice } }]
    //console.log(JSON.stringify(filter))
    Hotel.count(filter).then(count => {
        Hotel.find(filter).skip(start).limit(size)
            .then(hotel => {
                //console.log(hotel.length);
                if (!hotel) {
                    return res.status(404).send({
                        error: {
                            global: 'Hotel not found with page ' + page
                        }
                    });
                }
                let value = {
                    totalPage: Math.ceil(count / 10),
                    list: hotel
                }
                res.json([value]);
            }).catch(err => {
                return res.status(500).send({
                    error: {
                        global: 'Error retrieving Hotel with page ' + page
                    }
                });
            })
    })
        .catch(err => {
            return res.status(500).send({
                error: {
                    global: 'Error retrieving Hotel with page ' + page
                }
            });
        });

}

const getDetail = (req, res) => {
    const id = req.params.id;
    Hotel.find({ _id: id })
        .then(hotel => {
            if (!hotel) {
                return res.status(404).send({
                    error: {
                        global: 'Hotel not found with page ' + page
                    }
                });
            }
            res.json(hotel);
        }).catch(err => {
            return res.status(500).send({
                error: {
                    global: 'Error retrieving Hotel with page ' + page
                }
            });
        })
}
export {
    // list,
    // create,
    // getPage,
    getPageFilter,
    getDetail
}