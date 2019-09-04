class UserTokenController < Knock::AuthTokenController
end

post 'user_token' => 'user_token#create'