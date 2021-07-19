import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/Post.action';
import { isEmpty } from './Utils';
import Card from './posts/Card.posts';


const Thread = () => {
    //Une fonction qui permet de loader les posts une seule fois
    const [loadPost, setLoadPost] = useState(true);

    //creation d'une variable dispatch pour envoyer l'action
    const dispatch = useDispatch()

    //On se recupère les actions dans un store
    const posts = useSelector((state) => state.postReducer);

    //Compteur pour le nbre de  posts à afficher dur la page(infiniteScroll)
    const [count, setCount] = useState(2);

    const loadMore = () => {
        //si jamais on est en bas de la page, incremente la liste

        if (window.innerHeight + document.documentElement.scrollTop + 1 >
            document.scrollingElement.scrollHeight) {
            setLoadPost(true)
        }
    }

    //On recupère tous les posts quand on va utiliser le composant Thread(utilisation de useEffect)
    useEffect(
        () => {
            if (loadPost) {
                //On veut un nbre dynamique de posts, donc on passe count en paramètre de getPosts
                dispatch(getPosts(count));
                //Ne plus relancer cette action
                setLoadPost(false)
                setCount(count + 2)
            }
            //A chaque fois que le user scrolle la page, on lance la fonction 
            //loadMore(qui permet de visusaliser la liste des postes au fur et à mur)
            window.addEventListener('scroll', loadMore);
            return () => window.removeEventListener('scroll', loadMore)
        }, [loadPost, dispatch, count])
    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map(
                        (post) => {
                            return <Card post={post} key={post._id} />
                        })
                }
            </ul>

        </div>

    );
};

export default Thread;