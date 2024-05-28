import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'


const MAIL_KEY = 'mailDB'
const loggedinUser = { email: 'roy@appsus.com', fullname: 'Roy Shacked' }

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getFilterFromSearchParams,
    getEmptyFilter
}

// window.cs = mailService

function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.isRead !== 'All') {
                if (filterBy.isRead === 'true') mails = mails.filter(mail => mail.isRead === true)
                if (filterBy.isRead === 'false') mails = mails.filter(mail => mail.isRead === false)
            }
            mails = _filterByMailStatus(mails, filterBy.status)
            return mails
        })
}

function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail = _setNextprevMailId(mail)
            return mail
        })
}

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        isDraft: true,
        sentAt: Date.now(),
        removedAt: null,
        from: loggedinUser,
        to: {
            email: '',
            fullname: utilService.makeLorem(1),
        },
    }
}

function getFilterFromSearchParams(searchParams) {
    return {
        status: searchParams.get('status') || 'inbox',
        txt: searchParams.get('txt') || '',
        isRead: searchParams.get('isRead') || 'All',
        compose: searchParams.get('compose') || '',
        // isStarred: searchParams.get('isStarred') || '',
        // lables: searchParams.get('lables') || '',
    }
}

function getEmptyFilter() {
    return {
        status: '',
        txt: '',
        isRead: 'All',
    }
}

// Private functions

function _setNextprevMailId(mail) {
    return asyncStorageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        for (let i = 0; i < 30; i++) {
            const mail = {
                id: utilService.makeId(),
                subject: utilService.makeLorem(3),
                body: utilService.makeLorem(20),
                isRead: false,
                isStarred: false,
                isDraft: false,
                sentAt: Date.now(),
                removedAt: null,
                from: {
                    email: `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`.split(' ').join(''),
                    fullname: utilService.makeLorem(1),
                },
                to: loggedinUser,
            }
            mails.push(mail)
        }
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _filterByMailStatus(mails, status) {
    switch (status) {
        case 'inbox':
            return mails.filter(mail => mail.to.email === loggedinUser.email)
        case 'starred':
            return mails.filter(mail => mail.isStarred)
        case 'sent':
            return mails.filter(mail => mail.from.email === loggedinUser.email && !mail.isDraft)
        case 'trash':
            return mails.filter(mail => mail.removedAt)
        case 'draft':
            return mails.filter(mail => mail.isDraft)
        default:
            return mails.filter(mail => mail.to.email === loggedinUser.email)
    }
}


// function getSpeedStats() {
//     return asyncStorageService.query(MAIL_KEY)
//         .then(mails => {
//             const mailCountBySpeedMap = _getmailCountBySpeedMap(mails)
//             const data = Object.keys(mailCountBySpeedMap).map(speedName => ({ title: speedName, value: mailCountBySpeedMap[speedName] }))
//             return data
//         })

// }

// function getVendorStats() {
//     return asyncStorageService.query(MAIL_KEY)
//         .then(mails => {
//             const mailCountByVendorMap = _getmailCountByVendorMap(mails)
//             const data = Object.keys(mailCountByVendorMap)
//                 .map(vendor =>
//                 ({
//                     title: vendor,
//                     value: Math.round((mailCountByVendorMap[vendor] / mails.length) * 100)
//                 }))
//             return data
//         })
// }


// function _getmailCountBySpeedMap(mails) {
//     const mailCountBySpeedMap = mails.reduce((map, mail) => {
//         if (mail.maxSpeed < 120) map.slow++
//         else if (mail.maxSpeed < 200) map.normal++
//         else map.fast++
//         return map
//     }, { slow: 0, normal: 0, fast: 0 })
//     return mailCountBySpeedMap
// }

// function _getmailCountByVendorMap(mails) {
//     const mailCountByVendorMap = mails.reduce((map, mail) => {
//         if (!map[mail.vendor]) map[mail.vendor] = 0
//         map[mail.vendor]++
//         return map
//     }, {})
//     return mailCountByVendorMap
// }

