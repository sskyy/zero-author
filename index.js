/**
 * log user to node.
 * @module author
 */

var _ = require('lodash')

module.exports = {
  listen : {},
  expand: function( module){
    var root = this
    if( module.author ){
      _.forEach( module.author, function( config,modelName ){
        root.addListener( root.listen, modelName, config)
      })
    }
  },
  addListener:function(  listeners, modelName, config){
    var root = this
    listeners[modelName+".create.before"] = function( val ){
      var bus = this
      //TODO allow user to specify which field to cache

      ZERO.mlog("author","attaching user to node", bus.session("user"), val)

      if( bus.session("user") ){
        val.user = bus.session("user")
        //expose for search
        val.uid = val.user.id
        return root.dep.model.models['user'].findOne({id:val.user.id}).then(function(user){
          var updateObj = {}
          if( user ){
            updateObj.statistics = user.statistics || {}
            updateObj.statistics[modelName] = (updateObj.statistics[modelName]||0)+1
            return bus.fire("user.update",{id:val.user.id},updateObj)
          }
          return bus.error(406,'user not found')
        })
      }

    }
  },
  bootstrap : function(){
    this.dep.bus.expand( this )
  }
}