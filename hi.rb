# Copyright 2012 Thomas Pierson <contact@thomaspierson.fr> ,
#                Nicolas Prat <nicooprat@gmail.com>
#
# This file is part of Css2Less Web Site.
#
# Css2Less Web Site is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Css2Less Web Site is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with Css2Less Web Site.  If not, see <http://www.gnu.org/licenses/>.

require 'sinatra'
require 'haml'
require 'rdiscount'
require 'css2less'

get '/' do
  haml :index
end

post('/convert') do
  if params[:css].empty?
    redirect '/'
  end
  css = params[:css]
  converter = Css2Less::Converter.new(css)
  converter.process_less
  "#{converter.get_less}"
end

not_found do
  'This is nowhere to be found.'
end

error do
  'Sorry there was a nasty error - ' + env['sinatra.error'].name
end
