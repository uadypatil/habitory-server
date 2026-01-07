authSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'auth_huid' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        this.huid = counter.seq;
    }
    next();
});


authSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await hashPassword(this.password);
    next();
});