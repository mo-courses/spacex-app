import {React, useState} from 'react';
import ListItem from '../ListItem/ListItem';
import S from './style.module.css';
import { launchesData } from '../../mocks/launches.js';
import { rocketsData } from '../../mocks/rockets'

console.log(launchesData)

function useForceUpdate() {
    const [i, setI] = useState(0);
    return () => setI(i+1)
}


export default function List({category}) {
    const forceUpdate = useForceUpdate()
    const [keyword, setKeyword] = useState('')
    const [text, setText] = useState('')
    const [success, setSuccess] = useState('')


    // function toggleLike(idx) {
    //     Data[idx].like = !Data[idx].like;
    //     forceUpdate();
    // }
    function heandleClickSearch() {
        setKeyword(text)
    }
    function filterList(iteme) {
        if(!keyword) return true;
        const regexp = new RegExp(keyword, 'i');
        return iteme.name.match(regexp);
    }
    function filterLaunchesSuccess(iteme) {
        if(!success) return true;
        if(category == 'Launches') {
            return String(iteme.success) == success
        }else if(category == 'Rockets') {
            return String(iteme.active) == success
        }
    }
    function getCategory(category) {
        switch (category) {
            case 'Launches':
                return launchesData
            case 'Rockets':
                return rocketsData
            default:
                return []
        }
    }
    return (
        <div className={S.list}>
            <div className={S.search_wrapper}>
                <button className={S.search_button} onClick={heandleClickSearch}>
                    <i className="fas fa-search" />
                </button>
                <input
                    className={S.search_input}
                    type="search"
                    placeholder={`Поиск...`}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}/>
                <select id='select' className={S.search_select} value={success} onChange={(e) => setSuccess(e.target.value)}>
                    <option value=''>
                        {category === 'Launches' ? 'Result' : 'Activity'}
                    </option>
                    <option value='true'>
                        {category === 'Launches' ? 'Success' : 'Active'}
                    </option>
                    <option value='false'>
                        {category === 'Launches' ? 'Failure' : 'No active'}
                    </option>
                </select>
            </div> 
            <div className="items">
                {getCategory(category)
                    .filter((iteme) => filterLaunchesSuccess(iteme))
                    .filter((iteme) => filterList(iteme))
                    .map(({id, name, links, details, success, description, flickr_images}, idx) => <ListItem
                    key={id}
                    title={name}
                    urlImg={category == 'Launches' ? links.patch.small : flickr_images[0]}
                    description={category == 'Launches' ? {details, success} : description}
                    // like={like}
                    // onToggleLike={() => toggleLike(idx)}
                />)}
            </div>
        </div>
    )
}