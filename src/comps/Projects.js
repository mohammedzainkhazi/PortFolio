import {useEffect,useState} from 'react';
import Card from './Card';
import {db} from './Firebase';
import {onValue, ref } from 'firebase/database';

function Projects() {

    const projects = [
            {
              Description : "This is python programmed AI assistant which responds to almost queries of user just more like Google Assistant,Siri & Alexa",
              ImageUrl : "https://i.ytimg.com/vi/NZMTWBpLUa4/maxresdefault.jpg",
              Title : "A.I Virtual Assistant",
            },
    ];

    const [post, setpost] = useState([]);

    const fetchData = async()=>{
        let posts = [];
        const count = ref(db, 'posts/');
        await onValue(count, (snapshot) => {
            snapshot.forEach(pst => {
                const data = pst.val()
                posts.push({data})
            })
            setpost(posts);
        });
    }

    useEffect(() => {
        fetchData();        
    }, [])

    return ( 
        <div>
            <section className="text-gray-400 bg-gray-900 body-font m-3 pb-5 rounded-lg">
                <div className="container px-5 py-5 mx-auto">
                <div className="mb-10 ">
                    <h1 className=" w-1/3 w-sm p-5 pb-1 pl-0 text-white text-left text-lg font-bold">PROJECTS</h1>
                    <p className="bg-indigo-900 w-1/3 h-1.5 rounded-lg"></p>
                </div>
                    <div className="flex flex-wrap -m-5">
                        {
                            projects.map((p,i)=>(
                                <Card key={i} link={p.link} title={p.Title} desc={p.Description} img={p.ImageUrl}/>    
                            ))
                        }
                        {
                            post.map((p,i)=>(
                                <Card key={i} link={p.data.link} title={p.data.Title} desc={p.data.Description} img={p.data.ImageUrl}/>    
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Projects
