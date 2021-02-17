import { sort } from 'd3';
import { toast } from 'react-toastify';

// *********************** API Utilities ***********************

const BASE_URL = 'http://localhost:8000';

// *********************** D3 Tools ***********************

const colorPalette = {
    "C": '#555555',
    "C#": '#178600',
    "C++": '#6866fb', 
    "CSS": '#563d7c',
    "Dart": '#00B4AB',
    "Go": '#375eab',
    "Java": '#b07219',
    "JavaScript": '#f1e05a',
    "Kotlin": '#F18E33',
    "HTML": '#e44b23',
    "Perl": '#0000fb',
    "PHP": '#4F5D95',
    "Python": '#3572A5',
    "R": '#198ce7',
    "Ruby": '#701516',
    "Rust": '#dea584',
    "Scala": '#DC322F',
    "Swift": '#ffac45',
}

//******************** Notification Responses ********************

const notifyDiscard = () => toast.error('❕ Changes Discarded!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

const notifySuccess = () => toast.success(` ✔ Submission Successful!`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

const notifyError = () => toast.error('❕ Error on Submission!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

//******************** Helper Functions ********************

// Sort data
function sortingData(dataArr, field, isAsc) {
    // Temp variables to hold comparison values
    let tempVar1, tempVar2;
    
    if (dataArr.length !== 0) {
        const isString = typeof(dataArr[0][field]) === 'string';
        return dataArr.sort( (listA, listB) => {
            // Validate column value to normalize strings to lowercase
            if (isString) {
                tempVar1 = listA[field].toLowerCase();
                tempVar2 = listB[field].toLowerCase();
            } else {
                tempVar1 = listA[field];
                tempVar2 = listB[field];
            }
            
            if (isAsc) {
                if (tempVar1 < tempVar2) {return -1;}
                if (tempVar1 > tempVar2) {return 1;}
            } else {
                if (tempVar1 > tempVar2) {return -1;}
                if (tempVar1 < tempVar2) {return 1;}
            }
            return 0;
        })
    }
}

// Filter data
function filterData(dataArr, filterKey, filterSelection) {
    if (filterSelection !== 'all') {
        return dataArr.filter(item => item[filterKey] === filterSelection)
    } else {
        return dataArr
    }
}

// Calculating average amount of days
function dateDelta(dateArr) {
    let createDate, closeDate;

    const deltaPerBug = dateArr.map(bug => {
        createDate = new Date(bug.create_date)
        closeDate = new Date(bug.close_date)

        const timeDiff = closeDate - createDate;
        return timeDiff / (1000 * 3600 * 24);   
    })

    const sumDelta = deltaPerBug.reduce((a, b) => {
        return a + b;
    });

    return Math.round((sumDelta / dateArr.length) * 100) / 100;
}

// Get set of an array of objects
function createSet(dataArr, targetKey) {

    const extractValue = dataArr.map(item => item[targetKey]);

    const setObj = new Set(extractValue);

    return sort([...setObj]);
}

export { BASE_URL, colorPalette, notifyDiscard, notifySuccess, notifyError, sortingData, filterData, dateDelta, createSet};