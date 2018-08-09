import { DatasModel } from './datas.model';

const datasMock: DatasModel = {
    events: [
        {
            name       : 'event 1',
            description: 'description of the event 1',
            dates      : [
                {
                    start: 18881888880,
                    end  : 18881889880,
                },
            ],
            cover      : 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg',
            images     : [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94i5oLwtVw4VKAW-3RjzyOYAu5d0Bl1EJ2aRsFaLso2mBIWMWIw',
                'https://www.pxwall.com/wp-content/uploads/2018/06/Stock%20Images%20love%20image,%20heart,%20HD,%20island,%20ocean,%20Stock%20Images%206378311261.jpg',
            ],
        },
        {
            name       : 'event 2',
            description: 'description of the event 2',
            dates      : [
                {
                    start: 18882888880,
                    end  : 18882889880,
                },
            ],
            cover      : 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg',
            images     : [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94i5oLwtVw4VKAW-3RjzyOYAu5d0Bl1EJ2aRsFaLso2mBIWMWIw',
                'https://www.pxwall.com/wp-content/uploads/2018/06/Stock%20Images%20love%20image,%20heart,%20HD,%20island,%20ocean,%20Stock%20Images%206378311261.jpg',
            ],
        },
        {
            name       : 'event 3',
            description: 'description of the event 3',
            dates      : [
                {
                    start: 188838888,
                    end  : 188838898,
                },
            ],
            cover      : 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg',
            images     : [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94i5oLwtVw4VKAW-3RjzyOYAu5d0Bl1EJ2aRsFaLso2mBIWMWIw',
                'https://www.pxwall.com/wp-content/uploads/2018/06/Stock%20Images%20love%20image,%20heart,%20HD,%20island,%20ocean,%20Stock%20Images%206378311261.jpg',
            ],
        },
    ],
    images: [
        {
            url   : 'http://www.fake.com/images1.jpg',
            legend: 'image n°1',
        },
        {
            url   : 'http://www.fake.com/images2.jpg',
            legend: 'image n°2',
        },
        {
            url   : 'http://www.fake.com/images3.jpg',
            legend: 'image n°3',
        },
    ],
    about : 'a fake text about the site',
};

export default datasMock;