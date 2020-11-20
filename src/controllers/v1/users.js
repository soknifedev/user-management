import Session from '../../models/Session';
import User    from '../../models/User';
import assert  from 'http-assert';

export const create = async (req, res) => {
    const { email, password } = req.body;

    // assert(!await User.findByEmail(email), `Email '${email}' is already registered. Log in now!`);
    const user = new User({
      email,
      password
    });
    await user.save();
  
    res.success({ 
      userId: user._id
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    assert(user, 401, `Email ${email} was not found or is not registered. Register now!`);
    assert(await user.testPassword(password), 401, 'Invalid email or password');
  
    const session = await Session.createFromBody({
      userId: user._id
    });
  
    res.success({
      accessToken: session.accessToken
    });
};

export const list = async (req, res) => {
    const users = await User.find();
    assert(users, 204, 'No users found');
    res.success(users);
};

export const info = async (req, res) => {
    const { userId } = req.params;
    const user = await User.find({
        _id: userId
    });
    assert(user, 204, `No user '${userId}' found`);

    res.success(user);
};


export const update = async (req, res) => {
    const { userId } = req.params;

    delete req.body?._id; // do not allow _id modification

    let result;
    if(userId) {
        const user = await User.find({
            _id: userId
        });
        assert(user, 204, `No user '${userId}' found`);
        Object.assign(user, req.body);
        result = await user.save();
    }
    else {
        const users = await User.find();
        assert(users, 204, `No users found`);
        Object.assign(users, req.body);
        result = await users.save();
    }
    res.success(result);
};

export const remove = async (req, res) => {
    const { userId } = req.params;
    let result;
    if(userId) {
        const user = await User.find({
            _id: userId
        });
        assert(user, 204, `No user '${userId}' found`);
        result = await user.remove();
    }
    else {
        const users = await User.find();
        assert(users, 204, `No users found`);
        result = await users.remove();
    }
    res.success(result);
};