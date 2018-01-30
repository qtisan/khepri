## Dependencies for

### khepri - egg & antd pro sample
it is a experimental project.

### mysql@5.7.20

```
> cd ~/
> wget https://dev.mysql.com/get/mysql-apt-config_0.8.9-1_all.deb
> sudo dpkg -i mysql-apt-config_0.8.9-1_all.deb
> sudo apt-get update
> sudo apt-get install mysql-server
```
configuration.
1. change the bind address
```
> sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
```
set `bind-address` to `0.0.0.0`

2. grant the access.
```
> mysql -u root -p
mysql> grant all privileges on *.* to root@'%' identified by '[password]';
```

### git@2.16.1

```
> sudo add-apt-repository ppa:git-core/ppa
> audo apt-get update
> sudo apt-get install git
```

### node@8.9.4

1. get the install script for `nvm`
```
> cd ~/
> wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

2. The script clones the nvm repository to ~/.nvm and adds the source line to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

3. apply the env
```
> source ~/.bashrc # or (~/.bash_profile, ...)
```

4. install nodejs v8.9.4
```
> nvm install 8.9.4
```

## The `khepri` Project

### clone from git
```
> cd /project
> git clone https://github.com/qtisan/khepri.git
```

### install the dependencies
```
> cd ./khepri
> npm install
```

### check out the current branch
```
> git checkout inte_antd
```

### the config in `./config/config.default.js`

### run the application

#### run server for dev
```
> npm run dev
```

#### run the client app
```
> npm run web
```

### samba default for windows

1. configuarion the share folder
```
> sudo vi /etc/samba/smb.conf
```
add the section to the end of the configuration file.
```
# sample
[projects]
   comment = Shared Folder require password
   path = /project
   public = yes
   writable = yes
   valid users = lennon
   create mask = 0777
   directory mask = 0777
   force user = lennon
   force group = lennon
   available = yes
   browseable = yes
```

2. change password for the access user
```
> sudo smbpasswd [username]
```

3. access the share folder from windows with
```
\\ip-address\projects
```

