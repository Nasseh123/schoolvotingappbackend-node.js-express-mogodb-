module.exports=mongoose=>{
    const Candidates = mongoose.model(
        "candidates",
        mongoose.Schema(
            {
                points:String,
                position:{}
            }
        )
    );
    return Candidates;
}