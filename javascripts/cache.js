/**
* LocalStorage Cache with expiry
*
* Usage:
* // Set indefinitely
* Cache.set('someKey', {value: 1});	
*
* // Set with expiry
* Cache.set('someKey', {value: 1}, 3600000);	// 1 hour expiry
*
* // Get value
* var someKey = Cache.get('someKey');
*
* // Get value with callback
* Cache.get('someKey', function(value) {
*   // Do something with value
* });
*
* // Get expired value
* var someKey = Cache.get('someKey', {getExpired: true});
*
* // Invalidate key (expire the record)
* Cache.invalidate('someKey');
*
* // Existence check
* var keyExists = Cache.exists('someKey');
*/
(function(namespace) {

    var CachePayload = function(value, expires) {
        this.value = value;
        if (expires !== undefined) {
            if (expires > 100000000000) { // it's a timestamp
                this.expires = expires;
                //console.log('cache expires in future time');
            } else {
                this.expires = new Date().getTime() + expires || 0;
            }

        }
    };

    var LocalStorageCache = function() {
        this.hitCount = 0;
        this.missCount = 0;
    };

    LocalStorageCache.prototype.normalizeKey = function(key) {
        return 'cache-' + key;
    };

    LocalStorageCache.prototype.set = function(key, value, expires) {
        key = this.normalizeKey(key);
		if (msgpack) {
			localStorage.setItem(key, msgpack.pack(new CachePayload(value, expires)));
			//console.log('put reverse test', msgpack.unpack(localStorage.getItem(key).split(',')));
		} else {
			localStorage.setItem(key, JSON.stringify(new CachePayload(value, expires)));
		}
        return value;
    };

    LocalStorageCache.prototype.get = function(key, options, callback) {
		var getOld = false;
		
        if (typeof options === 'function') { // Handle 2 parameters, key and callback
			callback = options;
        }
		
		var opts = options || {};
		
        if (this.exists(key)) {
            key = this.normalizeKey(key);
			var payload;
			if (msgpack) {
				payload = msgpack.unpack(localStorage.getItem(key).split(','));
			} else {
				payload = JSON.parse(localStorage.getItem(key));
			}
            if (payload && (opts.getExpired || payload.expires === undefined || payload.expires > new Date().getTime())) {
                console.log('cache hit', key, payload.value);
                this.hitCount++;
                if (callback) {
					callback.call(namespace, null, payload.value);
					return this.hitCount;
				} else {
					return payload.value;
				}
            }
        }
        console.log('cache miss', key);
        this.missCount++;
        if (callback) {
            return callback.call(namespace, 'Did not find token');
        }
    };

    LocalStorageCache.prototype.invalidate = function(key) {
        var self = this;
        this.get(key, function(value) {
            self.set(key, value, -1);
        });
    };

    LocalStorageCache.prototype.exists = function(key) {
        var value = localStorage.getItem(this.normalizeKey(key));
        return !!value;
    };

    namespace.Cache = new LocalStorageCache();


})(window);