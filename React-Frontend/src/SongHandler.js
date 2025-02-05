import firebase from 'firebase';


//we should have access to every unique song id from push

export default class SongHandler{
    constructor(PushId,uid){
        this.pathing = "Users/" + uid+"/Songs/"+PushId
        console.log(PushId,uid)
        this.reference = firebase.database().ref(this.pathing)

    }
    changeDisplayName( newName  , fun){
            let updates = {displayName : newName};
            this.reference.set(updates, error=>{
                if (error){

                }
                else{
                    fun()
                }
            })
    }

    
    setBudget(number){
        let updates = {budget: number}
        this.reference.update(updates)
    }
    
    placeInGlobal(){
        let globalRef = firebase.database().ref("Global")
        this.reference.on("value"  , data=>{
            let song = data.val();
            globalRef.push(song , error=>{
                if(error){

                }
                else{
                    
                }
            })
        })

    }
    gatherReviews(){
        return this.reference.child("reviews").get()
    
    }
    //will contain the reason for reporting
    // username of the reporter
    //data of the report
    //place in a global scope
    reportReview(reportData){
        let reportRef = firebase.database().ref("Reported")
        reportRef.push(reportData , error=>{
            if(error){

            }
            else{
                
            }

        })

    }

}