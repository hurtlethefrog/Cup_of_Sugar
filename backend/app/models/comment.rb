class Comment < ApplicationRecord

  belongs_to :users, optional: true

end
